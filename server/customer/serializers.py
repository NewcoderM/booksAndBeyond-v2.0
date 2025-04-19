from rest_framework import serializers
from .models import Customer
from django.contrib.auth import authenticate

class CustomerRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Customer
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        customer = Customer(**validated_data)
        customer.set_password(password)  # properly hashes the password
        customer.save()
        return customer

    

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        user = authenticate(username=username, password=password)

        if not user:
            raise serializers.ValidationError("Invalid credentials")
        
        attrs['user'] = user
        return {'user': user}
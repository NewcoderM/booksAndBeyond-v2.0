from rest_framework import serializers
from .models import Book, Comment

class CommentSerializer(serializers.ModelSerializer):
    customer = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['customer', 'book']

    def get_customer(self, obj):
        """
        Custom method to return the customer details (id and username)
        """
        return {
            "id": obj.customer.id,
            "username": obj.customer.username
        }

    def update(self, instance, validated_data):
        instance.text = validated_data.get('text', instance.text) 
        instance.save()
        return instance


class BookSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = '__all__'
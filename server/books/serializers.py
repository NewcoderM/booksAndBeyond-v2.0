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
        """
        Update Comment instance using iteration over updatable fields
        """
        updatable_fields = ['text']
        for field in updatable_fields:
            if field in validated_data:
                setattr(instance, field, validated_data[field])
        instance.save()
        return instance


class BookSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = '__all__'
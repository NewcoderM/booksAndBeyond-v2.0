from django.db import models
from django.conf import settings
from cloudinary.models import CloudinaryField

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.TextField()
    cover_image = CloudinaryField('image', default="default_image_url")

    def __str__(self):
        return self.title


class Comment(models.Model):
    book = models.ForeignKey(Book, related_name='comments', on_delete=models.CASCADE)
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return f"Comment by {self.customer} on {self.book.title}"

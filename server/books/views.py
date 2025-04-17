from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from .models import Book, Comment
from .serializers import BookSerializer, CommentSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        """
        Custom action to fetch comments for a specific book.
        """
        book = self.get_object()
        comments = book.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        """
        Create a comment and associate it with a book.
        """
        try:
            book = Book.objects.get(id=request.data.get('book'))
        except Book.DoesNotExist:
            return Response(
                {'error': 'Book not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(customer=request.user, book=book)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        """
        Allow only the comment owner to update.
        """
        comment = self.get_object()
        if comment.customer != request.user:
            return Response(
                {'error': 'You do not have permission to update this comment'},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = self.get_serializer(
            comment,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        """
        Allow only the comment owner to delete.
        """
        comment = self.get_object()
        if comment.customer != request.user:
            return Response(
                {'error': 'You do not have permission to delete this comment'},
                status=status.HTTP_403_FORBIDDEN
            )

        comment.delete()
        return Response(
            {'message': 'Comment deleted successfully'},
            status=status.HTTP_204_NO_CONTENT
        )

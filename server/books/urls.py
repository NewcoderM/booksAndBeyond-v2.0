from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, CommentViewSet

router = DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]

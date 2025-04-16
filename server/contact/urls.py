from django.urls import path
from .views import ContactCreateView

urlpatterns = [
    path('api/contact/', ContactCreateView.as_view(), name='contact-create'),  # This will handle both GET and POST
]

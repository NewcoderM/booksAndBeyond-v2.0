from django.urls import path
from customer.views import RegisterView, CustomLoginView, LogoutView

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', CustomLoginView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
]
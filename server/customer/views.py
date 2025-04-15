from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import CustomerRegistrationSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .serializers import CustomerRegistrationSerializer, LoginSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = CustomerRegistrationSerializer
    permission_classes = [permissions.AllowAny]

class CustomLoginView(APIView):
    def post(self, request, *args, **kwargs):
        # Manually instantiate the serializer with the request data
        serializer = LoginSerializer(data=request.data)
        
        # Validate and raise exceptions if any
        if serializer.is_valid():
            # Get the user from validated data
            user = serializer.validated_data['user']
            
            # Get or create the auth token
            token, created = Token.objects.get_or_create(user=user)

            # Return token and only the necessary user fields (e.g., username, id)
            return Response({
                'token': token.key,
                'username': user.username,  # Return the username field
                'user_id': user.id  # Optionally, return user id
            })
        else:
            return Response(serializer.errors, status=400)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Delete the token associated with the current user
        request.user.auth_token.delete()
        return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)
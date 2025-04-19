from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Contact
from .serializers import ContactSerializer

class ContactCreateView(APIView):
    def get(self, request, *args, **kwargs):
        contacts = Contact.objects.all()  # Fetch all contact form submissions
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

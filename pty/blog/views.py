from .models import Post, Tag

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status

from .serializers import *


def BaseHtmlLoad(request):
    return render(request, 'base.html')


class PreviewPostsListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PreviewPostListSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return self.queryset.order_by('date_pub')


class FullPostsListView(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset = Post.objects.all()
    serializer_class = FullPostListSerializer
    lookup_field = 'id'


class TagsListView(generics.ListAPIView):
    serializer_class = TagSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        tags = Tag.objects.all()
        return tags


class TagCreate(generics.ListCreateAPIView):
    serializer_class = TagSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_200_OK)


class TagDelete(generics.DestroyAPIView):
    serializer_class = TagSerializer
    permission_classes = (AllowAny,)

    def delete(self, request, id):
        print("ID is: ", id)
        try:
            tag = Tag.objects.all()[id]
            tag.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

class TagUpdate(generics.UpdateAPIView):
    serializer_class = TagSerializer
    permission_classes = (AllowAny,)

    def update(self, request, id, **kwargs):
            tag = Tag.objects.all()[id]
            serializer = self.serializer_class(tag, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(status=status.HTTP_200_OK)




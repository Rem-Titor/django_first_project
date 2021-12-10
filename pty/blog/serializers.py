from rest_framework import serializers
from .models import Post, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'



class FullPostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class PreviewPostListSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(slug_field='title', read_only=True, many=True)

    class Meta:
        model = Post
        fields = "__all__"

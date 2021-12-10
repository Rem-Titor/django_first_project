from django.urls import path
from .views import *
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [

    path('posts/', PreviewPostsListView.as_view(), name='posts_list_url'),
    path('<int:id>/', FullPostsListView.as_view(), name='full_post_url'),
    path('tags/', TagsListView.as_view(), name='tags_list_url'),
    path('tag/create/', TagCreate.as_view(), name='tag_create_url'),
    path('tag/delete/<int:id>/', TagDelete.as_view(), name='tag_delete_url'),
    path('tag/update/<int:id>/', TagUpdate.as_view(), name='tag_update_url')
]
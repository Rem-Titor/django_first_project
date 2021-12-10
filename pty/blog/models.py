from django.db import models


class Tag(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return '{}'.format(self.title)

    class Meta:
        ordering = ['title']


class Post(models.Model):
    title = models.CharField(max_length=150, db_index=True)
    body = models.TextField(blank=True, db_index=True)
    date_pub = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, blank=True, related_name='posts')

    def get_tag(self):
        return self.tags

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-date_pub']

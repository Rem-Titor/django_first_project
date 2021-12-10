from django.http import HttpResponse
from django.shortcuts import render

def BaseHtmlLoad(request):
    return render(request, 'base.html')
from django.http import HttpResponse

def send_the_homepage(request):
    homepage = open('/Users/philhall/Documents/Projects/house_of_iron/frontend/build/index.html').read()
    return HttpResponse(homepage)
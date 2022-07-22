from django.http import HttpRequest, JsonResponse
from django.shortcuts import render,HttpResponse, redirect
from django.http.response import HttpResponseRedirect

from screeninfo import get_monitors
from user_agents import parse
# ORM Model
from .models import users

import pprint


# To get screen resolution
import pyautogui

# This is needed to load/hide secrets in a .env file in the same directory
import os
# from dotenv import load_dotenv

#fireBase API
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from django.conf import settings
# Ip Info API 
import ipinfo
access_token = os.getenv("IP_API_KEY")
handler = ipinfo.getHandler(access_token)
print(access_token, handler, 'here')
#THESE ARE GLOBAL VARIABLES TO KEEP TRACK OF DEVICE COUNT SO IT DOESN'T EARSE WHEN THE USER REFRESHES THE PAGE 
mobile = 0 
tablet = 0
monitor = 0
def getAPI(request):
    if request.is_ajax and request.method == "GET":
        return JsonResponse({"message": 'hello from django' }, status = 200)
def sendToFireStore(table, data):
    print('')
    
def index(request):
    if request.method == "GET":
        
        #THIS IS DJANGO 2.2 INBUILT FUNCTION. THIS ALLOWS TO RETRIVE THE USER AGENT
        user_info = request.headers['User-Agent']

        #THIS IS HOW TO PARSE THE {user_info} STRING. THIS THE user_agent PACKAGE AT WORK
        ua_string = str(user_info)
        user_agent = parse(ua_string)
        device_type = None
        if user_agent.is_mobile == True:
            device_type = "Mobile"
            global mobile
            mobile+=1
        if user_agent.is_tablet == True:
            device_type = "Tablet"
            global tablet
            tablet+=1
        if user_agent.is_pc == True:
            device_type = "Desktop"
            global monitor
            monitor+=1
        if user_agent.is_bot == True:
            print("THE MITCHELLS GOT ME")
            return HttpResponse("NO BOTS")
    
        #THIS SHOWS THE REQUEST NUMBER GIVING THEM ONE MORE UNIQUE ID 
        ticket=mobile+tablet+monitor
        
        #THIS IS A PYTHON DECONSTRUCTED FUNCTION, ITS FROM THE pytautogui PIP
        width, height  = pyautogui.size()
        
        # THIS IS THE DATA BEING COLLECTED
        data = {
            'ticket': ticket,
            'isBot':user_agent.is_bot,
            'ip': request.ipinfo.ip,
            'location': {
                'city': request.ipinfo.city,
                'state': request.ipinfo.region,
                'country':request.ipinfo.country,
                'postal': request.ipinfo.postal,
                'exact': {
                    'latitude': request.ipinfo.latitude,
                    'longitude': request.ipinfo.longitude
                },
            },
            'device':{
                'name': user_agent.device.family,
                'type': device_type,
                'browser': user_agent.browser.family,
                'screen':{
                    'isTouch': user_agent.is_touch_capable,
                    'width': width,
                    'height': height
                }
            }
            
        }
        pprint.pprint(data)
        return render(request, "index.html", sendToFireStore("visitor", data))
    else:
        if request.method == "POST":
            return HttpResponseRedirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ")


def resume(request):
    return HttpResponse("Success")
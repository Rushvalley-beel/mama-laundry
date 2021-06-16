import webbrowser as web
import time
from datetime import datetime
from pynput.keyboard import Key, Controller

keyboard = Controller()
phoneno = open('Git/main/mama-laundry/log/fetch-numberdest.txt','r').read()
message = open('Git/main/mama-laundry/log/fetch-whatsapp.txt','r').read()
web.open('http://web.whatsapp.com/send?phone='+phoneno+'&text='+message)

time.sleep(20.0)
keyboard.press(Key.enter)
keyboard.release(Key.enter)

time.sleep(20.0)
keyboard.press(Key.ctrl)
keyboard.press('w')

keyboard.release('w')
keyboard.release(Key.ctrl)
keyboard.press(Key.enter)
keyboard.release(Key.enter)

#time.sleep(10.0)
#keyboard.press(Key.enter)
#keyboard.release(Key.enter)

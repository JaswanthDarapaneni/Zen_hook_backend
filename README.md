# Zen_Hook_Backend

Step1: Clone repository <br>
  1.1: open cmd create folder
  <br>
  1.2: use commad 
  
  <code>mkdir backend </code>
  <br>
  1.3: move to the folder using 
  <br>
  <code>cd backend </code>
  <br>
  1.4: clone using link
  <br>
<code>
  git clone <url>
</code>
<br>
  1.5: move to folder 
  <br>
  <code> cd zen_hook_backend </code>
  <br>
  1.6: open at vscode use below command
  <br>
  1.7: <code> code . </code>
  <br>
Step2: Now open terminal run below command
<br>

  2.1: <code>npm install </code>
  
  <br>

  2.2: create one .env file inside 
  zen_hook_backend folder
  
  <br>
  2.3: in terminal
  <br>
  <code> mkdir .env </code> 
  <br>

              **OR**
  create using right click or default file creation button in the explorer

  <br>

  2.4: Add below values to your .env file
  
<br>

    ''' 
ZEN_HOOK_EMAIL = 'who going to receive email '
SENDER_EMAIL = 'Host email  (From)'
SENDER_PASS = 'Secret Passcode of host email'
DB_NAME = 'Your mongo db name'
URI = "Your mongo db uri "
PORT= your port 

    '''

    <br>
     
  2.5 Update this details with acutuval data
  <br>

## finally use below command to start application

<br>

'''
npm start 
'''

he he your appointment is now running 🎉
     

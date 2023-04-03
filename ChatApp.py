import os
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import openai

app = Flask(__name__)
app.template_folder = os.path.abspath('./templates')
app.config['SECRET_KEY'] = 'secret-key'

socketio = SocketIO(app, cors_allowed_origins='*')

openai.api_key = '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'

@app.route('/')
def home():
    print("Current working directory:", os.getcwd())
    return render_template('index.html')

@socketio.on('input')
def handle_message(data):
    message = data['message']
    response = generate_response(message)
    response = response.replace("```", "")
    emit('message-input', message)
    emit('message-response', {'message': response})
    
    
def generate_response(message):
    response = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=[{"role": "user", "content": message}]
    )
    
    return response.choices[0].message.content

if __name__ == '__main__':
    socketio.run(app, debug=True)
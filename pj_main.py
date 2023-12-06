from flask import Flask, render_template
import os

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
project_dir = os.path.join(base_dir, 'sungshin_sw/venv/')
template_dir = os.path.join(project_dir, 'templates/sungshin')
#print("경로 확인:" + template_dir)
app = Flask(__name__, template_folder=template_dir)

@app.route('/')
def home():
    return render_template('/contents/main_contents.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=False)


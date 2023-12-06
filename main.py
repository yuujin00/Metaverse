from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello world"

@app.route('/week3')
def week3_1():
    return render_template('/week3/week3_1.html')

@app.route('/main')
def main():
    return render_template('main.html')

@app.route('/new_page')
def newPage():
    return render_template('/html_dir/new_html.html')

@app.route('/jinja_sample')
def jinja_sample():
    title = "Jinja2 Sample Page Title"
    text = ['Sungshin', "women's", "university"]
    # t = 'Image'
    t = 'Language'
    algorithm = ["CNN", "RNN"]
    return render_template("/html_dir/jinja.html", title=title, textList=text, type=t, algorithmList=algorithm)

if __name__ == "__main__":
    app.run()
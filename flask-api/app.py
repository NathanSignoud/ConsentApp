from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/summarize', methods=['GET'])
def summarize():
    patient_id = request.args.get('patientId')
    pdf_name = request.args.get('pdfName')

    if not patient_id or not pdf_name:
        return jsonify({'error': 'Missing patientId or pdfName'}), 400

    summary = f"Résumé généré dynamiquement pour {pdf_name} et patient {patient_id}."
    return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Attention à ne pas être en conflit avec Express sur le port


// nn.js
class NeuralNetwork {
    constructor(input_nodes, output_nodes) {
        this.input_nodes = input_nodes;
        this.output_nodes = output_nodes;

        // Inicializar pesos
        this.weights = [];
        for (let i = 0; i < this.output_nodes; i++) {
            this.weights[i] = [];
            for (let j = 0; j < this.input_nodes; j++) {
                this.weights[i][j] = Math.random() * 2 - 1;
            }
        }
        this.learning_rate = 0.1;
    }

    // Función de activación sigmoide
    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    // Derivada de la función sigmoide
    dsigmoid(y) {
        return y * (1 - y);
    }

    // Método para hacer predicciones
    predict(inputs) {
        let outputs = [];
        for (let i = 0; i < this.output_nodes; i++) {
            let sum = 0;
            for (let j = 0; j < this.input_nodes; j++) {
                sum += inputs[j] * this.weights[i][j];
            }
            outputs[i] = this.sigmoid(sum);
        }
        return outputs;
    }

    // Método para entrenar la red
    train(inputs, targets) {
        let outputs = this.predict(inputs);
        let errors = [];
        for (let i = 0; i < this.output_nodes; i++) {
            errors[i] = targets[i] - outputs[i];
        }
        for (let i = 0; i < this.output_nodes; i++) {
            for (let j = 0; j < this.input_nodes; j++) {
                let gradient = errors[i] * this.dsigmoid(outputs[i]);
                this.weights[i][j] += this.learning_rate * gradient * inputs[j];
            }
        }
    }
}

// Inicializar la red neuronal
const nn = new NeuralNetwork(2, 1);

// Entrenar la red neuronal con datos de la puerta lógica AND
const training_data = [
    { inputs: [0, 0], targets: [0] },
    { inputs: [0, 1], targets: [0] },
    { inputs: [1, 0], targets: [0] },
    { inputs: [1, 1], targets: [1] },
];

for (let i = 0; i < 10000; i++) {
    let data = training_data[Math.floor(Math.random() * training_data.length)];
    nn.train(data.inputs, data.targets);
}

// Función para hacer predicciones desde el formulario
function predict() {
    let input1 = parseFloat(document.getElementById('input1').value);
    let input2 = parseFloat(document.getElementById('input2').value);
    let output = nn.predict([input1, input2]);
    document.getElementById('result').innerText = 'Output: ' + output[0].toFixed(2);
}

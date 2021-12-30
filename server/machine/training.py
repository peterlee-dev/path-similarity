import numpy as np
import json
import sys
from sklearn.neural_network import MLPClassifier
import tensorflow as tf


def load_tester(path):
    with open(path) as f:
        data = json.load(f)
        df = np.asarray(data)
        return df


alphabet = sys.argv[1]
inputs = load_tester(
    'machine/trainingData/{alphabet}/inputs.json'.format(alphabet=alphabet))
outputs = load_tester(
    'machine/trainingData/{alphabet}/outputs.json'.format(alphabet=alphabet))
file_name = 'machine/models/{alphabet}.h5'.format(alphabet=alphabet)

model = tf.keras.models.Sequential([
    tf.keras.layers.Flatten(input_shape=(10, 10)),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(10, activation='softmax')
])
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
model.fit(inputs, outputs, epochs=20, verbose=0)
model.save(file_name)

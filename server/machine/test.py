import json
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split


def load_tester(path):
    with open(path) as f:
        data = json.load(f)
        df = np.asarray(data)
        return df


inputs = load_tester('machine/trainingData/b/inputs.json')
outputs = load_tester('machine/trainingData/b/outputs.json')
x_train, x_test, y_train, y_test = train_test_split(inputs, outputs)
model = tf.keras.models.Sequential([
    tf.keras.layers.Flatten(input_shape=(10, 10)),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(x_train, y_train, epochs=20, verbose=0)
model.save('')
print(model.layers)

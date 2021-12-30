import numpy as np
import json
import sys

import tensorflow as tf
alphabet = sys.argv[1]
data = sys.argv[2]
file_name = "machine/models/{0}.h5".format(alphabet)
model = tf.keras.models.load_model(file_name)
mydata = np.asarray(json.loads(data))
predict = model.predict_classes(mydata)

print(predict)

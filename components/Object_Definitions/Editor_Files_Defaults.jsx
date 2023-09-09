export const EDITOR_FILE_DEFAULTS = [
  {
    name: 'intersect.c',
    language: 'c',
    data:
`/*** 
    Calculate a sphere's intersection with a ray 
 ***/

struct Vector3 {
    float x, y, z;
};

struct Ray {
    struct Vector3 origin;
    struct Vector3 direction;
};

bool IntersectSphere(struct Ray ray, struct Vector3 sphereCenter, float sphereRadius) {
    struct Vector3 oc = SubtractVectors(sphereCenter, ray.origin);
    float a = DotProduct(ray.direction, ray.direction);
    float b = 2.0 * DotProduct(oc, ray.direction);
    float c = DotProduct(oc, oc) - (sphereRadius * sphereRadius);
    float discriminant = b * b - 4 * a * c;

    if (discriminant > 0) {
        // The ray intersects the sphere
        return true;
    } else {
        // The ray misses the sphere
        return false;
    }
}

int main() {
    struct Ray ray;
    ray.origin = {0.0, 0.0, 0.0};
    ray.direction = {1.0, 0.0, 0.0};

    struct Vector3 sphereCenter = {1.0, 0.0, 0.0};
    float sphereRadius = 0.5;

    // Check for intersection
    bool isHit = IntersectSphere(ray, sphereCenter, sphereRadius);

    if (isHit) {
        printf("Hit!\\n");
    } else {
        printf("Miss!\\n");
    }

    return 0;
}`,
  },
  {
    name: 'CNN.py',
    language: 'python',
    data:
`###
 #   Train a Convolutional Neural Network to recognize handwritten digits
 ###

import numpy as np
import tensorflow as tf
from tensorflow import keras

# Load the MNIST dataset (or any other dataset of handwritten digits)
(train_images, train_labels), (test_images, test_labels) = keras.datasets.mnist.load_data()

# Preprocess the data
train_images = train_images.reshape((60000, 28, 28, 1))
train_images = train_images.astype('float32') / 255

test_images = test_images.reshape((10000, 28, 28, 1))
test_images = test_images.astype('float32') / 255

# Convert labels to one-hot encoding
train_labels = keras.utils.to_categorical(train_labels)
test_labels = keras.utils.to_categorical(test_labels)

# Build a neural network model
model = keras.models.Sequential()
model.add(keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)))
model.add(keras.layers.MaxPooling2D((2, 2)))
model.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))
model.add(keras.layers.MaxPooling2D((2, 2)))
model.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))
model.add(keras.layers.Flatten())
model.add(keras.layers.Dense(64, activation='relu'))
model.add(keras.layers.Dense(10, activation='softmax'))

# Compile the model
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Train the model
model.fit(train_images, train_labels, epochs=5, batch_size=64)

# Evaluate the model on test data
test_loss, test_accuracy = model.evaluate(test_images, test_labels)
print(f'Test accuracy: {test_accuracy}')

# Save the trained model
model.save('handwritten_digit_recognition_model.h5')
`,
  },
  {
    name: 'evolution.cpp',
    language: 'cpp',
    data:
`/***
    Simulating a basic ecosystem with organisms that interact and evolve over time
 ***/

#include <iostream>
#include <vector>
#include <random>

struct Organism {
    int x, y;   // position in the environment
    int energy; // energy level
};

const int kEnvironmentWidth = 50;
const int kEnvironmentHeight = 50;
const int kInitialPopulationSize = 100;
const int kMaxEnergy = 100;

std::vector<Organism> organisms;

void InitializeEcosystem() {
    // initialize with random organisms
    for (int i = 0; i < kInitialPopulationSize; ++i) {
        Organism organism;
        organism.x = rand() % kEnvironmentWidth;
        organism.y = rand() % kEnvironmentHeight;
        organism.energy = rand() % kMaxEnergy;
        organisms.push_back(organism);
    }
}

void SimulateEcosystem() {
    // simulate single step
    for (Organism& organism : organisms) {
        // do some action, like moving or consuming energy
        organism.x += rand() % 3 - 1;
        organism.y += rand() % 3 - 1;
        organism.energy -= rand() % 5;
        
        // check boundaries and energy level
        if (organism.x < 0) organism.x = 0;
        if (organism.x >= kEnvironmentWidth) organism.x = kEnvironmentWidth - 1;
        if (organism.y < 0) organism.y = 0;
        if (organism.y >= kEnvironmentHeight) organism.y = kEnvironmentHeight - 1;
        if (organism.energy <= 0) {
            // no energy -> remove
            organisms.erase(std::remove(organisms.begin(), organisms.end(), organism), organisms.end());
        }
    }
}

int main() {
    srand(time(NULL)); // seed generator
    
    InitializeEcosystem();
    
    for (int timestep = 0; timestep < 100; ++timestep) {
        SimulateEcosystem();
        
        std::cout << "Timestep " << timestep << ": " << organisms.size() << " organisms alive." << std::endl;
    }
    
    return 0;
}`,
  },
];

---
title: 4096 or 4095? Let's talk about ADC LSB
tags:
  - Machine Learning
  - Hands-On Machine Learning
disqusId: id
draft: true
toc: true
widgets:
  - position: left
    type: profile
    author: Sai (Emily) Peng
    author_title: Researcher
    location: Bruges, Belgium
    avatar: /img/avatar.png
    avatar_rounded: true
    follow_link: https://github.com/EmilyPeng2017
    social_links:
      Github:
        icon: fab fa-github
        url: https://github.com/EmilyPeng2017
      Email:
        icon: fas fa-envelope
        url: mailto:emily.peng0627@gmail.com
      LinkedIn:
        icon: fab fa-linkedin
        url: https://www.linkedin.com/in/sai-emily-peng/
      ResearchGate:
        icon: fab fa-researchgate
        url: https://www.researchgate.net/profile/Sai-Peng
      GoogleScholar:
        icon: fab fa-google
        url: https://scholar.google.com/citations?user=I-YA-aMAAAAJ&hl=en
  - position: left
    type: toc
    index: true
    collapsed: true
    depth: 3
  - position: left
    type: adsense
    client_id: ca-pub-7343226584296928
    slot_id: 7682375470
  - position: left
    type: recent_posts
  - position: left
    type: archives
  - position: left
    type: tags
    order_by: name
    show_count: true
date: 2025-01-07 11:22:32
categories:
---
<!-- toc -->
# Introduction
In this blog series, I will be documenting my learning journey with the book *Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow* by Aurélien Géron. This book is an excellent resource for gaining practical skills in machine learning and deep learning using Python libraries like Scikit-Learn, Keras, and TensorFlow. My goal is to learn and implement the algorithms discussed in the book and apply them to real-world problems.

## Learning Plan
I plan to cover the following topics over the course of this series:
1. Supervised Learning: Linear Regression, Decision Trees, KNN
2. Unsupervised Learning: Clustering and Anomaly Detection
3. Deep Learning: Neural Networks, CNNs, RNNs
4. Model Evaluation and Optimization

Each blog post will focus on a specific chapter or concept from the book, with practical code examples and insights.

# Chapter 1: Introduction to Machine Learning
## Key Concepts
- **Machine Learning**: A type of AI that allows systems to learn from data and improve over time without being explicitly programmed.
- **Supervised Learning**: Learning from labeled data to predict outcomes.
- **Unsupervised Learning**: Learning from unlabeled data to discover patterns.

### Key Algorithms Covered
- **Linear Regression**: A method to model the relationship between a dependent variable and one or more independent variables.
- **Logistic Regression**: Used for binary classification problems.

## Code Implementation
```python
# Example of Linear Regression in Scikit-Learn
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_regression

# Create a sample regression dataset
X, y = make_regression(n_samples=100, n_features=1, noise=0.1, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)

# Print the predictions
print(predictions[:10])

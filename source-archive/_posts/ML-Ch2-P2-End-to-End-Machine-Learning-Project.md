---
title: ML-Ch2-P2-End to End Machine Learning Project
tags:
  - Machine Learning
  - Hands-On Machine Learning
disqusId: ml-ch2-p2
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
date: 2025-01-09 23:47:31
categories:
  - keeplearning
  - machineLearning
---

<!-- toc -->

[Machine Learning blog series]([tags/Machine Learning](https://emilypeng2017.github.io/tags/Hands-On-Machine-Learning/))
#  **Introduction**  

Welcome to this exciting chapter  Again! 

<!-- more -->
---


#  **Step 3: Explore and Visualize the Data to Gain Insights**  

- make a copy of the original dataset so we can revert to it afterwards

## Visualizing geographical data
Since the dataset includes geographical information, it is a good idea to create a scatterplot of all the districts to visualize the data.

```python
housing.plot(kind='scatter', x='longitude', y='latitude', grid=True)
plt.show()
```

<div style="text-align: center;"> 
  <img src="/img/blogs/18_ch2_2/1.png" alt="Fig 1: A geographical scatterplot of the data" width="600">
</div>
But this is hard to see any particular pattern. Setting the alpha option to 0.2 makes it easier to visualize the places where there is a high density of data points.

```python
housing.plot(kind='scatter', x='longitude', y='latitude', grid=True, alpha=0.2)
plt.show()
```

<div style="text-align: center;"> 
  <img src="/img/blogs/18_ch2_2/2.png" alt="Fig 1: A better visualization that highlights high-density areas" width="600">
</div>

Next, let's look at the housing prices. The radius of each circle represents the district's population (option s), and the color represents the price (option c). We can use a predefined color map (option cmap) called *jet*, which ranges from blue (low values) to red (high prices).
```python
housing.plot(kind='scatter', x='longitude', y='latitude', grid=True,
             s=housing["population"] / 100, label="population",
             c="median_house_value", cmap="jet", colorbar=True,
             legend=True, sharex=False, figsize=(10,7), alpha=0.2)
plt.show()
```
<div style="text-align: center;"> 
  <img src="/img/blogs/18_ch2_2/3.png" alt="Fig 1: A better visualization that highlights high-density areas" width="600">
</div>


## Look for corrections


## Experiment with attribute combinations


---

#  **Step 4: Prepare the Data for Machine Learning Algorithms**  



---

#  **Step 5: Select a Model**  



---

#  **Step 6: Fine-Tune the Model**  



---

#  **Step 7: Present the Solution**  



---

#  **Step 8: Launch, Monitor, and Maintain the System**  



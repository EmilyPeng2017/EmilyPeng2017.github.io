---
title: 2_A wireless, self-powered smart insole for gait monitoring and recognition via nonlinear synergistic pressure sensing
thumbnail: /img/blogs/24_paper/prototype.png
tags:
  - Materials
  - wearable devices
  - self-powered
  - smart insole
  - Science Advances
categories:
  - articles
  - literatureReview
disqusId: literature_2
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
date: 2025-04-19 10:36:53
---

<!-- toc -->
<div align="center">
    <img src="/img/blogs/24_paper/prototype.png" alt="Photographs of the smart insole system" style="width:100%;">
    <p><strong>Figure 1:</strong> Prototype of the smart insole system</p>
</div>
**🗓 Published**: April 2025  
**📚 Journal/Conference**: *Science Advances*

<!-- more -->
---

## 🔍 Abstract

This paper introduces a **fully integrated**, **wireless**, and **self-powered smart insole** that performs **real-time pressure monitoring** and **gait analysis**. It stands out thanks to a **nonlinear synergistic sensing strategy**, which enables both **remarkable linearity** and **high durability**—a rare combo in soft electronics.  

The insole system supports **real-time visualization** and motion classification using a machine learning model (SVM), and it successfully recognizes **eight types of movements**.  

Some thoughts I had while reading:
- How exactly does the nonlinear strategy enhance durability?  
- Did they compare different machine learning models?  
- What are the specific eight motion states?



## 🧗‍♂️ Technical Challenges

1. Achieving **high linearity** and **long-term stability** in flexible sensors  
2. Designing a **wearable energy module** that offers consistent, reliable power  

---

# 💡 Key Insights

## 🌟 System Design

### 🧩 Structure

<div align="center">
    <img src="/img/blogs/24_paper/structure.png" alt="" style="width:100%;">
    <p><strong>Figure 2:</strong> Overall structure of the smart insole system</p>
</div>

- **22 sensors** in total — that's quite impressive for a single insole.
- Layers include **upper and lower PI encapsulation**, which can be difficult to integrate — I’d love to know how they managed that.
- The **conductive layer** includes **carbon nanotubes** and **acetylene black (乙炔黑)** — both excellent conductors.
- Sensors are densely embedded in the **PDMS layer**, which contributes to their **durability**.
- **Lithium battery** and **PCB** are housed in the **arch** of the insole.

### 🔁 Synergistic Strategy

- They cancel out nonlinear mechanical and electrical effects through a clever **nonlinear synergistic strategy**.

<div align="center">
    <img src="/img/blogs/24_paper/synergy.png" alt="" style="width:100%;">
    <p><strong>Figure 3:</strong> Nonlinear Synergistic Strategy</p>
</div>

Some questions:
- Does this method apply uniformly across all sensors?
- How do they ensure sensor-to-sensor consistency?

### 🤖 Machine Learning Model

- They used an **SVM** to classify motion states:  
  **Sitting, Standing, Single-leg standing, Squatting, Walking, Running, Ascending stairs, Descending stairs**

> I wonder: did they use **one insole or a pair** for classification?

---

## 🎨 A Closer Look

### 🧪 Sensor Fabrication

They used **sugar templating** to create a porous structure.

<div align="center">
    <img src="/img/blogs/24_paper/sugar.png" alt="" style="width:100%;">
    <p><strong>Figure 4:</strong> Sensor fabrication process</p>
</div>

Here’s how the entire system is assembled:

<div align="center">
    <img src="/img/blogs/24_paper/system.png" alt="" style="width:100%;">
    <p><strong>Figure 5:</strong> System fabrication process</p>
</div>

On uniformity: I don’t think perfect uniformity is possible here, but they achieved a **relatively consistent result**.

<div align="center">
    <img src="/img/blogs/24_paper/uniformity.png" alt="" style="width:100%;">
    <p><strong>Figure 6:</strong> Sensor uniformity across the array</p>
</div>

### 🧠 Machine Learning Models

They experimented with several models:
- **SVM** (support vector machine)
- **Random forest**
- **Neural network** (CNN)

---

# 🌟 Personal Insights

This study really packs it all in — **self-powered**, **wireless pressure monitoring**, and **real-time gait analysis** — all within a single system.  

With **over 10 authors**, it's clear this was a large, multidisciplinary effort. The paper touches on a lot — from material innovation to system integration to machine learning. It feels like an *all-in-one* paper. But because it covers so many aspects, each individual part doesn't go very deep. There's a sense that some technical details had to be sacrificed for the sake of breadth.

Still, reading this reminded me: there are **so many meaningful problems to solve**, and **so many powerful tools** available — but we can only focus on a few. Choosing a direction and going deep remains as important as ever.


---

# 📖 Reference

Wang, Qi, et al. "A wireless, self-powered smart insole for gait monitoring and recognition via nonlinear synergistic pressure sensing." Science Advances 11.16 (2025): eadu1598. DOI: [doi.org/10.1038/s41467-024-55323-6](https://www.science.org/doi/full/10.1126/sciadv.adu1598)

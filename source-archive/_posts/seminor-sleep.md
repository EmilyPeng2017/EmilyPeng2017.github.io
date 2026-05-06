---
title: seminar_eWEAR Seminar_Sleep wearables
thumbnail: /img/blogs/35_seminar/1.png
tags:
  - wearable devices
  - seminar
  - Stanford University
  - 3D printing
categories:
  - keeplearning
  - seminars
disqusId: seminar_20250602
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
date: 2025-06-02 23:51:19
---
<!-- toc -->
<div style="text-align: center;">
    <img src="/img/blogs/35_seminar/1.png" alt="" width="600">
</div>
To be honest, today's talks were not that attractive. I think the problem with sleep cannot be resolved by wearable devices. And the presenters could not persuade me by the introductions. That's why there is no interest to continue listening to it.

<!-- more -->

# Multiscale Biofabrication Towards System 'Engineering' Biology

## Talk 1: **Wearable Sensors for Real-World Circadian Monitoring — From Science to Application**

**Speaker:** Lara Weed  
**Position:** PhD Candidate  
**Affiliation:** Department of Bioengineering, Schools of Engineering & Medicine, Stanford University  

### 🧠 Background

The **external (mechanical) clock** is engineered for *consistency*:
- Fixed 24-hour period  
- Constant ticking rate  
- Can be reset instantly to any time  
- Behaves the same regardless of when it's adjusted  

The **circadian clock**, however, is optimized for *adaptability*. It aligns internal time with the external environment:
- Approximate 24-hour period  
- Variable ticking rate  
- Resets gradually  
- Response depends on timing of the reset  

📌 *Example:* Jet lag — a mismatch between internal circadian time and the external clock.

---

### 🕵️‍♀️ The Problem

While wearables can track **physiological** and **behavioral** data, they cannot directly measure **circadian timing**.

Why?  
> Circadian influence on peripheral systems (e.g. heart rate, body temperature) is **masked** by regular activities.

---

### 💡 The Solution

**Combining:**
- Wearable light exposure tracking  
- A model of individual light sensitivity  

→ Produces a **circadian phase model**.

---

### 🛠️ Real-World Translation with Wearables

To make this practical, several applied questions need to be addressed:

- **Data & Participants:**  
  How does the pattern of light exposure affect the model’s accuracy?

- **Recording Duration:**  
  How many days of data are needed for reliable circadian timing estimates?

---

## Talk 2: **Development of Samsung’s Sleep Apnea Feature**

**Team:** Digital Health Solutions  
**Speaker:** Matt Wiggins  
**Role:** Head of Digital Health Solutions Lab

---

### 💤 Obstructive Sleep Apnea (OSA)

**What happens?**  
Soft tissues in the throat collapse during sleep → blocked airway.

**Severity levels:**  
- Mild  
- Moderate  
- Severe

**Common comorbidities:**  
- Hypertension  
- Diabetes  
- Heart failure  
- Stroke  
- Obesity

**Treatment options:**  
- CPAP  
- Weight loss  
- Lifestyle adjustments  
- Sleep position therapy

---

### ⚠️ Challenges

- Highly prevalent  
- Often underdiagnosed  
- Serious health impacts

---

### 📊 System Overview
<!-- toc -->

<div style="text-align: center;">
    <img src="/img/blogs/35_seminar/2.png" alt="" width="600">
</div>

**Algorithm Highlights:**
- Detects breathing disruptions by identifying **SpO₂ dips**
- SpO₂ is estimated from **Red/IR PPG signals** on the smartwatch
- Computes **Estimated Apnea-Hypopnea Index (eAHI)**
- Diagnostic criteria: **2 nights with eAHI ≥ 15**

---

### ✅ Usability Validation

- **20 subjects** with diverse backgrounds  
- **Situational testing** with a Software as a Medical Device (SaMD) interface  
- Focused on ensuring accurate and appropriate user responses

Both pictures are screenshots from the presentations. If there is any conflict, please contact me, thanks.

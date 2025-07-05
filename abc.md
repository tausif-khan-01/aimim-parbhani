Sure! Here's a **clear, structured, and rewritten version** of your prompt for the **Volunteer Registration System using Next.js**:

---

## 🗳️ AIMIM Volunteer Registration System – Requirements

We are building a **Next.js application** with the following pages and features to manage volunteer registrations across 9 Talukas in the Parbhani district.

---

### ✅ Pages Overview

1. **Volunteer Registration Page**
2. **Admin Dashboard**
3. **Registrations List Page (Protected)**

---

### 🔹 1. Volunteer Registration Page

This page will contain a **registration form** built using **React Hook Form** and **Yup** for validation.

#### 🔸 Form Fields:

| Label (English)                       | Label (Marathi) / Notes                                 | Type     |
| ------------------------------------- | ------------------------------------------------------- | -------- |
| Name                                  | नाव                                                     | Text     |
| Mobile / WhatsApp Number              | -                                                       | Phone    |
| City / Taluka                         | - Dropdown with 9 Talukas                               | Select   |
| Age Group                             | - (18–25, 26–35, 36–50, 50+)                            | Select   |
| Education                             | - (Under 10th, 10th Pass, 12th Pass, Graduate, PG, PhD) | Select   |
| Occupation                            | -                                                       | Text     |
| Prabhag                               | प्रभाग                                                  | Text     |
| How can you strengthen the party?     | आप किस तरह पार्टी को मज़बूत कर सकते हैं?                | Textarea |
| Are you ready to join AIMIM Parbhani? | - (Yes / No)                                            | Radio    |

#### 🔸 Taluka WhatsApp Group Redirection

Each Taluka has its own WhatsApp group:

```js
const whatsapp_groups = [
  { taluka: "Parbhani", group_link: "https://chat.whatsapp.com/..." },
  { taluka: "Gangakhed", group_link: "https://chat.whatsapp.com/..." },
  { taluka: "Sonpeth", group_link: "https://chat.whatsapp.com/..." },
  { taluka: "Pathri", group_link: "https://chat.whatsapp.com/..." },
  { taluka: "Manwath", group_link: "https://chat.whatsapp.com/..." },
  { taluka: "Palam", group_link: "https://chat.whatsapp.com/..." },
  { taluka: "Selu", group_link: "https://chat.whatsapp.com/..." },
  { taluka: "Jintur", group_link: "https://chat.whatsapp.com/..." },
  { taluka: "Purna", group_link: "https://chat.whatsapp.com/..." },
];
```

#### 🔸 Form Submission Flow:

1. User visits the form page.
2. Fills and submits the form.
3. **Duplicate Check**: If the mobile number already exists in the database:

   * Show an error message: “You have already registered.”
4. If the mobile number is **new**:

   * Save the data to the database.
   * Show success message: “Registration successful!”
   * Redirect to the corresponding **WhatsApp group link** based on the selected Taluka.

---

### 🔹 2. Admin Dashboard (Protected Route)

Only accessible to authenticated admins.

#### Dashboard Features:

* **Total registrations**
* **Registrations count by Taluka**
* **Recent Registrations**
* **Charts or statistics section (Optional)**

---

### 🔹 3. Registrations List Page (Protected Route)

Displays a searchable, filterable, and paginated list of all volunteers.

#### Features:

* **Filters:**

  * By Taluka
  * By Age Group
  * By Education
  * By Occupation
* **Table Format (Desktop):** List all fields + actions (Edit, Delete)
* **Card Format (Mobile):** Responsive design showing the same info in card layout
* **Pagination:** Client-side or server-side

---

### 🔐 Authentication

* Admin pages (dashboard + registrations) should be protected with **admin login**
* Use either **JWT** or **NextAuth** for session management

---

 

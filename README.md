
## 📊 ExcelUpload

`@angay/excel-upload` is an Angular library for handling **Excel file uploads** easily in your Angular applications.  
It supports `.xlsx` and `.xls` formats, validates files, and extracts the **first column values** from the first sheet.

---

## 🚀 Installation

```bash
npm install @angay/excel-upload xlsx
````

> ⚠️ `xlsx` is required as a peer dependency, so install it along with the package.

Make sure you have Angular v17+ installed in your project.

---

## 📦 Usage

Import the module in your AppModule (or any feature module):

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExcelUploadModule } from '@angay/excel-upload';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ExcelUploadModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

---

## ▶️ Use the component in your template:

```html
<angay-excel-upload></angay-excel-upload>
```

---

## ✅ Features

* Accepts `.xlsx` and `.xls` formats
* Rejects invalid file types
* Rejects files larger than **2MB**
* Rejects empty files
* Extracts the **first column values** from the first sheet

---

## ⚙️ Supported Angular Versions

Angular `^17.0.0`


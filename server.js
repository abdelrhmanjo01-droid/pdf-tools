const express = require("express");
const axios = require("axios");

const app = express();

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.send("PDF Tools Server is Running 🚀");
});

// تحويل PDF إلى PNG (مثال)
app.get("/convert", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.cloudconvert.com/v2/jobs",
      {
        tasks: {
          "import-file": {
            operation: "import/url",
            url: "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
          },
          "convert-file": {
            operation: "convert",
            input: "import-file",
            input_format: "pdf",
            output_format: "png"
          },
          "export-file": {
            operation: "export/url",
            input: "convert-file"
          }
        }
      },
      {
        headers: {
          Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzE5NmM2MDY0MTE2YzNiYTlmZTRiNmJlOWZmYmEwYWIzMTBjYmQ5MTUyZWRhNzViODA2MzgwNDc2M2MwNjAyYjk0MDUyNDA1MmU2MDcyNDYiLCJpYXQiOjE3NzQ0MzU1MTIuOTYyNjU1LCJuYmYiOjE3NzQ0MzU1MTIuOTYyNjU3LCJleHAiOjQ5MzAxMDkxMTIuOTU3Nzc5LCJzdWIiOiI3NDg0NzQyOCIsInNjb3BlcyI6WyJ0YXNrLnJlYWQiLCJ0YXNrLndyaXRlIl19.hRpwGOuaNWjAv7dBvQZjCXJGEZQNAQuiPb0jI_pskbFtcsd_WpJG9f6EgzL78zXNmCTqWMXAIWeadpxFV6ynkTp3XDs-oZW7OqsbXwP7b4Z8-vcWCmIM36r9kkwUHXnO0stPHep07muOISC7JvLB1s3SOqzuAipORqZSC_P3IcnGvVoQzsge056tm-gNeaxeh_HqyBprjc7ChBHsuFrvJjSfjBeYYRkMa-gzE8Noa0JwrLp0E4vVEeEvBdGyJc2gySD7ia82JmXtMRGJ_wq01n4KSmtwFbBGMmC4TSPHiNuWO0ffgNZL-q7sKCaNX4Oj0yTwFpu4EhJKhsWB3LdaDPSzh_hG47NxBss699MXpV1Qvu6Q7Y1XgUoSf5lRYIzHjzS7Se_5MoUkq4etC6H4Brio-eL7zgwXvyEF1docSktcXXSTs1aQZpGsECMRYBPC458BONDPkqNntOiNzmQfkpvCMuearj5t5GblgDqijcvHNlJAiq0o6LwM6MgAR3M1ChFj81UHYGvLn4pPuPmf4DfYOKdIpdsA8gXqBFiK5oFyPngswbUzywnNYtuFWDce2Dk1oIyZvPPYu_CanFsmzkyIsJ-KPxj-kTMaGUeqOu2nvUVnU_XJDqUVFO7nRKB2KWA2UCC7JZCrjosjT-a1eq5npwvkf-kqEp6pRG2UfJ0
",
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.send("Error: " + error.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

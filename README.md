# cowrywise-test

This Repository contains the code for my Cowrywise Frontend Engineer opening assessment.

## Tech Stack
For this test, I used the following tools:
- Vue JS 3 (Composition API)
- Axios
- SCSS
- Vite

I was able to meet the requirements and also added some extras, such as:

## Extras
### Blurhash
I used the blurhash string provided by Unsplash on every image to render a blurred-out version of the images before they fully load to give a perceived sense of faster loading times and reduce the loading stutter, only rendering the full version of the image.
![image](https://github.com/user-attachments/assets/b41a689a-acad-463e-941f-580df4b8826a)

### Composables
I used composables provided via Vue 3 in favor of state-management tools for reusable functionality such as data fetching and the blurhash implementation since the app is fairly simple. This by itself might not have been necessary, but it was a good way to show off knowledge of the composition API.

### Clean Code
I went with a component-based approach rather than dump all the code in the `App.vue` file just because it's the right thing to do and it also makes reviewing the code easier.

## Demo
### Loading Screen
![image](https://github.com/user-attachments/assets/03f958fc-0706-42d6-b15a-49a129795db4)

### Landing page
![image](https://github.com/user-attachments/assets/f3169540-31b8-4275-9d10-796cacb833de)

### Searching Page
![image](https://github.com/user-attachments/assets/baa4ab87-ee56-498f-899d-5ac6427d66f7)

### Search results
![image](https://github.com/user-attachments/assets/bdcfa02a-e87f-4b38-ace8-bf925685b840)

### Single Image Modal
<img width="1512" alt="image" src="https://github.com/user-attachments/assets/2b9f0ad7-3d5a-453b-9297-0ef3401ecc9f">


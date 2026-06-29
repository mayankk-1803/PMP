async function checkUrls() {
  const urls = [
    "https://res.cloudinary.com/dncupx9ul/image/upload/v1782708277/pacmyproduct/subcategories/womens-day-gifts.png",
    "https://res.cloudinary.com/dncupx9ul/image/upload/v1782708277/pacmyproduct/subcategories/womens-day-gifts.jpg"
  ];
  
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(`URL: ${url} -> Status: ${res.status}`);
    } catch (e) {
      console.error(`URL: ${url} -> Error: ${e.message}`);
    }
  }
}

checkUrls();

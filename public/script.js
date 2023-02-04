async function myFunc(obj){
  console.log(obj)
  console.log("hello world???s")

  let text = document.getElementById('text');
  let header = document.getElementById("header");

  console.log({text, header})

  let textText = text.value
  let headerText = header.value

  const request = await fetch('http://localhost:4000/posts/new', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({header: headerText, text: textText})
  });
  const content = await request.json();

  console.log(content);
}
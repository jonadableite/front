export async function getPlainsAction() {
    const plains = {
      data: [
        {
          id: "plain1",
          name: "Initial",
          tag: "initial",
          price: 4999,
          attributes: "Atibuto 1; Atributo 2; Atributo 3; Atributo 4; Atributo 5"
        },
        {
          id: "plain2",
          name: "Intermedium",
          tag: "intermedium",
          price: 99.90,
          attributes: "Atibuto 1; Atributo 2; Atributo 3; Atributo 4; Atributo 5"
        },
        {
          id: "plain1",
          name: "Advanced",
          tag: "advanced",
          price: 149.90,
          attributes: "Atibuto 1; Atributo 2; Atributo 3; Atributo 4; Atributo 5"
        }
      ]
    } 
  
    return plains
  }
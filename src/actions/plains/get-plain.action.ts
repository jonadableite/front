export async function getPlainAction(tag:string) {
    if (tag === 'initial'){
        return {
            id: "plain1",
            name: "Initial",
            tag: "initial",
            price: 4999,
            attributes: "Atibuto 1; Atributo 2; Atributo 3; Atributo 4; Atributo 5"
        }
    }

    if (tag === 'intermedium'){
        return {
            id: "plain2",
            name: "Intermedium",
            tag: "intermedium",
            price: 99.90,
            attributes: "Atibuto 1; Atributo 2; Atributo 3; Atributo 4; Atributo 5"
        }
    }

    if (tag === 'advanced'){
        return {
            id: "plain1",
            name: "Advanced",
            tag: "advanced",
            price: 149.90,
            attributes: "Atibuto 1; Atributo 2; Atributo 3; Atributo 4; Atributo 5"
        }
    }
  }
//Criando Banco de Dados

export class Database{
    #database = {}

    // Passar a tabela que eu selecionar
    select(table) {

        const data = this.#database[table] ?? [];
        
        return data;

    }
    //Receber a tabela do banco de dados
    insert(table,data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else{
            this.#database[table] = [data]
        }
        
        return data;

    }
}
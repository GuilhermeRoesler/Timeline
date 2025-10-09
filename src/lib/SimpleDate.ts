export class SimpleDate {
    private valor: string; // Armazena "YYYY-MM-DD"

    constructor(data: string) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
            throw new Error(`Formato ${data} inválido. Use YYYY-MM-DD.`);
        }
        this.valor = data;
    }

    getYear(): number {
        return Number(this.valor.slice(0, 4));
    }

    getMonth(): number {
        return Number(this.valor.slice(5, 7));
    }

    getDay(): number {
        return Number(this.valor.slice(8, 10));
    }

    toString(): string {
        return this.valor;
    }

    toDate(): Date {
        const [ano, mes, dia] = this.valor.split("-").map(Number);
        return new Date(ano, mes - 1, dia); // fuso local
    }
}
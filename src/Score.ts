export default interface Score extends Array<Part>{}
interface Part extends Array<Measure>{}
interface Measure extends Array<number>{}
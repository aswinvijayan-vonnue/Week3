class Employee {
  constructor(name, dept, salary, yearsExp) {
    this.name = name;
    this.dept = dept;
    this.salary = salary;
    this.yearsExp = yearsExp;
  }
}
const emp1 = new Employee("name1", "Engineering", 50000, 10);
const emp2 = new Employee("name2", "Testing", 90000, 5);
const emp3 = new Employee("name3", "Finance", 20000, 1);
const emp4 = new Employee("name4", "Engineering", 500000, 10);
const emp5 = new Employee("name5", "HR", 100000, 20);
const emp6 = new Employee("name6", "HR", 160000, 40);
const emp7 = new Employee("name7", "Engineering", 98000, 10);
const emp8 = new Employee("name8", "Testing", 90000, 5);
const emp9 = new Employee("name9", "Finance", 20000, 1);
const emp10 = new Employee("name10", "Engineering", 92000, 10);
const emp11 = new Employee("name11", "HR", 190000, 20);
const emp12 = new Employee("name12", "Engineering", 50000, 10);
const emp13 = new Employee("name13", "Testing", 90000, 5);
const emp14 = new Employee("name14", "Finance", 20000, 1);
const emp15 = new Employee("name15", "Engineering", 52000, 10);
const emp16 = new Employee("name16", "HR", 20000, 20);
const emp17 = new Employee("name17", "Engineering", 150000, 10);
const emp18 = new Employee("name18", "Testing", 90000, 5);
const emp19 = new Employee("name19", "Finance", 20000, 1);
const emp20 = new Employee("name20", "Engineering", 50000, 10);
let employees = [
  emp1,
  emp2,
  emp3,
  emp4,
  emp5,
  emp6,
  emp7,
  emp8,
  emp9,
  emp10,
  emp11,
  emp12,
  emp13,
  emp14,
  emp15,
  emp16,
  emp17,
  emp18,
  emp19,
  emp20,
];
employees = employees
  .filter((emp) => emp.dept === "Engineering")
  .filter((emp) => emp.salary > 70000)
  .map((emp) => {
    return { name: emp.name, salary: emp.salary };
  })
  .sort((employee1, employee2) => employee2.salary - employee1.salary);
console.log(employees);

const config = {
  version: "6.15.0",
  dev: "true",
  license: "MIT",
  fullname: {
    firstName: "first",
    lastname: "last",
  },
};
const {
  version,
  dev,
  license,
  fullname: { firstName },
  fullname: { lastname },
} = config;
console.log(version);
console.log(dev);
console.log(license);
console.log(firstName);
console.log(lastname);

const address = {
  place: "Sulthan Batheri",
  pin: "670601",
  district: "Wayanad",
};
const mergedobject = { ...config, ...address };
console.log("Merged two objects config and address");
console.log(mergedobject);
console.log("Merged entries");
console.log(Object.entries(mergedobject));
console.log("keys");
console.log(Object.keys(mergedobject));
console.log("values");
console.log(Object.values(mergedobject));

function deepclone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  const clone = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepclone(obj[key]);
    }
  }
  return clone;
}
const cloned = deepclone(config);
console.log("cloned version");
cloned.fullname.firstName = "Rohith";
console.log(cloned);

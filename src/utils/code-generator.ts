import { CodeColumn } from "../typing";

export default class CodeGenerator {
  private interface_code: string = "";
  private crud_file_code: string = "";
  private columns_file_code: string = "";
  private search_file_code: string = "";
  private forms_file_code: string = "";
  private api_file_code: string = "";
  table_name: string;
  name: string;
  columns?: string | CodeColumn[];
  constructor(table_name: string, columns?: string | CodeColumn[]) {
    this.name = table_name;
    this.table_name = `${table_name.toUpperCase().slice(0, 1)}${table_name.slice(1)}`;
    this.columns = columns;
    this.generate();
  }

  generate() {
    this.interface_code = this.createInterfaceCode();
    this.crud_file_code = this.createCrudCode();
    this.columns_file_code = this.createColumnsCode();
    this.search_file_code = this.createSearchCode();
    this.forms_file_code = this.createFormsCode();
    this.api_file_code = this.createApiFileCode();
  }

  createInterfaceCode() {
    const insertCode = this.createInsertCode(
      (column) => `  ${column.dataIndex}: ${column.type};`,
    );
    return `interface ${this.table_name} {
${insertCode.join("\n")}
}`;
  }

  createCrudCode() {
    return `import {
  create${this.table_name},
  delete${this.table_name},
  fetch${this.table_name}List,
  update${this.table_name},
} from "@/api/business/${this.name}";
import { Crud } from "@/components";
import { ${this.table_name} } from "app";
import columns from "./modules/columns";
import searchs from "./modules/search";
import forms from "./modules/forms";
export default function ${this.table_name}Page() {
  return (
    <Crud<${this.table_name}>
      listApi={fetch${this.table_name}List}
      createApi={create${this.table_name}}
      updateApi={update${this.table_name}}
      deleteApi={delete${this.table_name}}
      queryKey="${this.name}"
      columns={columns}
      searchs={searchs}
      forms={forms}
    />
  );
}`;
  }

  createColumnsCode() {
    const insertCode = this.createInsertCode(
      (column) =>
        `  { dataIndex: '${column.dataIndex}', title: '${column.title}' }`,
    );
    return `import { CrudProps } from "@/components";
import { ${this.table_name} } from "app";

const columns: CrudProps<${this.table_name}>["columns"] = [
${insertCode.join(",\n")},
];
export default columns;`;
  }

  createSearchCode() {
    const insertCode = this.createInsertCode(
      (column) =>
        `  { name: "${column.dataIndex}", label: "${column.title}", formItem: <Input placeholder="请输入" /> }`,
    );
    return `import { CrudProps } from "@/components";
import { Input } from "antd";
import { ${this.table_name} } from "app";

const searchs: CrudProps<${this.table_name}>["searchs"] = [
${insertCode.join(",\n")},
];

export default searchs;`;
  }

  createFormsCode() {
    const insertCode = this.createInsertCode(
      (column) =>
        `  { name: "${column.dataIndex}", label: "${column.title}", formItem: <Input placeholder="请输入" /> }`,
    );
    return `import { CrudProps } from "@/components";
import { Input } from "antd";
import { ${this.table_name} } from "app";

const forms: CrudProps<${this.table_name}>["forms"] = [
${insertCode.join(",\n")},
];

export default forms;
`;
  }

  createApiFileCode() {
    return `import request from "@/utils/request";
import { ${this.table_name}, PageQuery, PageResult } from "app";

export const fetch${this.table_name}List = (params: PageQuery<Partial<${this.table_name}>>) => {
  return request<PageResult<${this.table_name}>>({
    url: "/${this.name}",
    method: "get",
    params,
  });
};

export const get${this.table_name} = (id: number) => {
  return request<${this.table_name}>({
    url: \`/${this.name}/\${id}\`,
    method: "get",
  });
};

export const create${this.table_name} = (data: ${this.table_name}) => {
  return request<${this.table_name}>({
    url: "/${this.name}",
    method: "post",
    data,
  });
};

export const update${this.table_name} = (data: ${this.table_name}) => {
  return request<${this.table_name}>({
    url: \`/${this.name}/\${data.id}\`,
    method: "put",
    data,
  });
};

export const delete${this.table_name} = (id: number) => {
  return request<${this.table_name}>({
    url: \`/${this.name}/\${id}\`,
    method: "delete",
  });
};`;
  }

  createInsertCode(handler: (item: CodeColumn) => string) {
    const columns = this.columns;
    const insertCode: string[] = [];
    Array.isArray(columns) &&
      columns.forEach((column) => {
        insertCode.push(handler(column));
      });
    return insertCode;
  }

  getCode() {
    return {
      table_name: this.table_name,
      columns: this.columns || [],
      interface_code: this.interface_code,
      crud_file_code: this.crud_file_code,
      columns_file_code: this.columns_file_code,
      search_file_code: this.search_file_code,
      forms_file_code: this.forms_file_code,
      api_file_code: this.api_file_code,
    };
  }
}

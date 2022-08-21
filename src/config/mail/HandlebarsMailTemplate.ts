import hbs from 'handlebars';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}

class HandlebarsMailTemplate {
  public async parse({
    template,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const parseTemplate = hbs.compile(template);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplate;

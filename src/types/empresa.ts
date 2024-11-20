export interface Template {
  template_vars: {
    header: { type: string; content: string }[];
    body: { type: string; content: string }[];
  };
  start_script: {
    type: string;
    content: string;
    url?: string;
    title?: string;
  }[];
}

export interface MetaConfiguration {
  template: Template;
  // other properties if needed
}
export interface TemplateListVars {
  name?: string;
  image?: string;
  content?: string;
  type?: string;
}
export type Empresa = {
  company: any;
  companyUnity: any;
  template: any;
  templatelistvars?: TemplateListVars[];
  integration_name: string;
  message_per_runs: any;
  acelera_parceiro_configs: any;

  map(
    arg0: (item: Empresa) => import("react").JSX.Element
  ): import("react").ReactNode;
  length: number;

  id: string;
  name: string;
  config_id: string;
  application: string;
  fantasy: string;
  document: string;
  state: string;
  email: string;
  phone: string;
  city: string;
  cep: string;
  street: string;
  uf: string;
  number: string;
  image: string;
  active: boolean;
  latitude: string;
  longitude: string;
  neighborhoodId: string;
  enable_whatsapp: boolean;
  customMessage: string;
  intents?: Array<Intention>;
  companyId: string;
  idCompanie: string;
  companyData: string;
  enabled: boolean;
  is_conversation_ia: boolean;
  enable_to_send_us_to_lead: boolean;
  enable_to_send_provider?: boolean;
  whatsapp_provider?: string;
  campaign_number_business?: string;
  enable_curation?: boolean;
  meta_configuration?: MetaConfiguration; // Use MetaConfiguration here

  campaign_number_id: string;
  campaign_number_token: string;
  webhook_validation_token: string;
  messages_by_intent?: {
    abandono?: ParceiroByIntent[];
    abandono_smart?: ParceiroByIntent[];
    // other properties as needed
  };
};

type ParceiroByIntent = {
  content?: string;
  step?: Int32Array;
  time?: Int32Array;
  type?: string;
  url?: string;
};

type Intention = {
  id?: string;
  intent?: string;
  utterances?: Answer[];
  answers?: Utterances[];
  text?: string;
  image?: string;
  link?: string;
};

type Answer = {
  text?: string;
  image?: string;
  link?: string;
};

type Utterances = {
  image: any;
  text?: string;
};

export type IntentionMeta = {
  id?: string;
  intent?: string;
  utterances?: Answer[];
  answers?: Utterances[];
  text?: string;
  image?: string;
  link?: string;
  type?: string;
};

type AnswerMeta = {
  text?: string;
  image?: string;
  link?: string;
};

type UtterancesMeta = {
  image: any;
  text?: string;
};

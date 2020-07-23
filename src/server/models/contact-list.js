import thinky from "./thinky";
const type = thinky.type;
import { requiredString } from "./custom-types";

const ContactList = thinky.createModel(
  "contact_list",
  type
    .object()
    .schema({
      id: type.string(),
      organization_id: requiredString()
    })
    .allowExtra(false),
  { noAutoCreation: true }
);

ContactList.ensureIndex("organization_id");

export default ContactList;

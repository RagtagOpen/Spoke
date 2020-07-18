import thinky from "./thinky";
const type = thinky.type;
import { requiredString } from "./custom-types";

const ContactList = thinky.createModel(
  "contact_list",
  type
    .object()
    .schema({
      id: type.string(),
      campaign_id: requiredString()
    })
    .allowExtra(false),
  { noAutoCreation: true }
);

ContactList.ensureIndex("campaign_id");

export default ContactList;

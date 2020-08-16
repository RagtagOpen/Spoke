import {
  setupTest,
  cleanupTest,
  createUser as helperCreateUser,
  createInvite as helperCreateInvite,
  createOrganization as helperCreateOrganization
} from "../../test_helpers";
import { r, ContactList } from "../../../src/server/models";

describe("A ContactList model", () => {
  let userTest;
  let inviteTest;
  let organizationTest;
  let contactListFields;

  beforeEach(async () => {
    await setupTest();

    userTest = await helperCreateUser();
    inviteTest = await helperCreateInvite();
    organizationTest = await helperCreateOrganization(userTest, inviteTest);

    contactListFields = {
      organization_id: organizationTest.data.createOrganization.id
    };

    await new ContactList(contactListFields).save();
  }, global.DATABASE_SETUP_TEARDOWN_TIMEOUT);

  afterEach(async () => {
    await cleanupTest();
    if (r.redis) r.redis.flushdb();
  }, global.DATABASE_SETUP_TEARDOWN_TIMEOUT);

  it("saves the campaign_id", async () => {
    const [contactListFromDB] = await ContactList.getAll();
    expect(contactListFromDB).toMatchObject(contactListFields);
  });
});

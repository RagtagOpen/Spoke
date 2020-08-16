import {
  setupTest,
  cleanupTest,
  createUser as helperCreateUser,
  createInvite as helperCreateInvite,
  createOrganization as helperCreateOrganization,
  createContactList
} from "../../test_helpers";
import { r, Campaign } from "../../../src/server/models";

describe("A ContactList model", () => {
  let userTest;
  let inviteTest;
  let organizationTest;
  let contactListTest;
  let campaignFields;

  beforeEach(async () => {
    await setupTest();

    userTest = await helperCreateUser();
    inviteTest = await helperCreateInvite();
    organizationTest = await helperCreateOrganization(userTest, inviteTest);
    contactListTest = await createContactList(organizationTest);
  }, global.DATABASE_SETUP_TEARDOWN_TIMEOUT);

  afterEach(async () => {
    await cleanupTest();
    if (r.redis) r.redis.flushdb();
  }, global.DATABASE_SETUP_TEARDOWN_TIMEOUT);

  it("saves the Campaign fields without contact_list_id", async () => {
    campaignFields = {
      organization_id: organizationTest.data.createOrganization.id
    };

    await new Campaign(campaignFields).save();

    const [campaignFromDB] = await Campaign.getAll();
    expect(campaignFromDB).toMatchObject(campaignFields);
  });

  it("saves the CampaignContact fields with contact_list_id", async () => {
    let campaignFields = {
      organization_id: organizationTest.data.createOrganization.id,
      contact_list_id: contactListTest.id
    };

    await new Campaign(campaignFields).save();

    const [campaignFromDB] = await Campaign.getAll();
    expect(campaignFromDB).toMatchObject(campaignFields);
  });
});

import {
  setupTest,
  cleanupTest,
  createUser as helperCreateUser,
  createInvite as helperCreateInvite,
  createOrganization as helperCreateOrganization,
  createContactList,
  createCampaign
} from "../../test_helpers";
import { r, CampaignContact } from "../../../src/server/models";

describe("A CampaignContact model", () => {
  let userTest;
  let inviteTest;
  let organizationTest;
  let campaignTest;
  let contactListTest;
  let campaignContactFields;

  beforeEach(async () => {
    await setupTest();

    userTest = await helperCreateUser();
    inviteTest = await helperCreateInvite();
    organizationTest = await helperCreateOrganization(userTest, inviteTest);
    campaignTest = await createCampaign(userTest, organizationTest);
    contactListTest = await createContactList(organizationTest);
  }, global.DATABASE_SETUP_TEARDOWN_TIMEOUT);

  afterEach(async () => {
    await cleanupTest();
    if (r.redis) r.redis.flushdb();
  }, global.DATABASE_SETUP_TEARDOWN_TIMEOUT);

  it("saves the CampaignContact fields without contact_list_id", async () => {
    campaignContactFields = {
      campaign_id: campaignTest.id,
      cell: "111-111-1111"
    };

    await new CampaignContact(campaignContactFields).save();

    const [campaignContactFromDB] = await CampaignContact.getAll();
    expect(campaignContactFromDB).toMatchObject(campaignContactFields);
  });

  it("saves the CampaignContact fields with contact_list_id", async () => {
    campaignContactFields = {
      campaign_id: campaignTest.id,
      contact_list_id: contactListTest.id,
      cell: "111-111-1111"
    };

    await new CampaignContact(campaignContactFields).save();

    const [campaignContactFromDB] = await CampaignContact.getAll();
    expect(campaignContactFromDB).toMatchObject(campaignContactFields);
  });
});

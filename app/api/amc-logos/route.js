import { ConnectDB } from "@/lib/db/ConnectDB";
import AmcsLogoModel from "@/lib/models/AmcsLogos";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  await ConnectDB();
  try {
    const { categoryID,addisstatus } = await req.json();

    // Fetch source data
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_DATA_API}/api/amc-logo`);
    const sourceData = response.data;

    // Fetch local data
    const localData = await AmcsLogoModel.find({});
    const localIds = localData.map(item => item._id.toString());
    const sourceIds = sourceData.map(item => item._id);

    // DELETE: Remove stale entries
    const idsToDelete = localIds.filter(id => !sourceIds.includes(id));
    if (idsToDelete.length > 0) {
      await AmcsLogoModel.deleteMany({ _id: { $in: idsToDelete } });
    }

    // UPSERT: Perform in parallel
    await Promise.all(
      sourceData.map(item =>
        AmcsLogoModel.findByIdAndUpdate(
          item._id,
          {
            logo: item.logo,
            logoname: item.logoname,
            logourl: item.logourl,
            logocategory: item.logocategory,
            status: item.status,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        )
      )
    );

    // Return filtered result
    const filteredData = await AmcsLogoModel.find({ logocategory: categoryID });

    return NextResponse.json(
      { message: "Data uploaded successfully", data: filteredData },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}


export async function GET(req) {
  await ConnectDB();

  try {
    const { searchParams } = new URL(req.url);
    const categoryID = searchParams.get("categoryID");
    const addisstatus = searchParams.get("addisstatus") === "true"; // string to boolean

    // Build query filter
    const query = {};
    if (categoryID) {
      query.logocategory = categoryID;
    }
    query.addisstatus = addisstatus; // always filter by addisstatus (default false)

    const filteredData = await AmcsLogoModel.find(query);

    return NextResponse.json({ success: true, data: filteredData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || error }, { status: 500 });
  }
}
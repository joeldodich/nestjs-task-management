import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  ClientWriteSingleResponse,
  OpenFgaClient,
  TupleKey,
} from '@openfga/sdk';

@Injectable()
export class RebacService {
  private readonly openfga = new OpenFgaClient({
    apiUrl: process.env.HAIMDAL_API_URL, // required
    storeId: process.env.HAIMDAL_STORE_ID, // not needed when calling `CreateStore` or `ListStores`
    // authorizationModelId: process.env.HAIMDAL_MODEL_ID, // Optional, can be overridden per request
    // credentials: {
    //   method: CredentialsMethod.ClientCredentials,
    //   config: {
    //     apiTokenIssuer: process.env.HAIMDAL_API_TOKEN_ISSUER,
    //     apiAudience: process.env.HAIMDAL_API_AUDIENCE,
    //     clientId: process.env.HAIMDAL_CLIENT_ID,
    //     clientSecret: process.env.HAIMDAL_CLIENT_SECRET,
    //   }
    // }
  });

  async can(
    user: string,
    relation: string,
    object: string,
    authorization_model_id?: string,
  ): Promise<boolean> {
    const response = await this.openfga.check({ user, relation, object });
    return response.allowed;
  }

  async createRelations(
    relationshipTouples: TupleKey[],
  ): Promise<ClientWriteSingleResponse[]> {
    try {
      const res = await this.openfga.write({ writes: relationshipTouples });
      if (res.writes[0].err) {
        throw new InternalServerErrorException('Error authorizing request.');
      }
      return res.writes;
    } catch (e) {
      throw new InternalServerErrorException('Error authorizing request.', {
        description: e.message,
      });
    }
  }

  async removeRelations(
    relationshipTouples: TupleKey[],
  ): Promise<ClientWriteSingleResponse[]> {
    try {
      const res = await this.openfga.write({ deletes: relationshipTouples });
      if (res.deletes[0].err) {
        throw new InternalServerErrorException('Error authorizing request.');
      }
      return res.deletes;
    } catch (e) {
      throw new InternalServerErrorException('Error authorizing request.', {
        description: e.message,
      });
    }
  }
}
